pipeline {
    agent any
    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }
    environment {
        SCANNER_HOME = tool name: 'sonar-scanner'
    }
    stages {
        stage('Clean workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout from Git') {
            steps {
                git branch: 'master', url: 'https://github.com/maheshreddy32825/2048.git'
            }
        }
        stage('Sonarqube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''
                    $SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectName=Game \
                    -Dsonar.projectKey=Game
                    '''
                }
            }
        }
        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('OWASP FS SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('TRIVY FS SCAN') {
            steps {
                sh 'trivy fs . > trivyfs.txt'
            }
        }
        stage('Build & Tag & Push Docker Image') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        sh 'docker build -t mamir32825/2048:latest .'
                        sh 'docker push mamir32825/2048:latest'
                    }
                }
            }
        }
        stage('TRIVY Docker Image Scan') {
            steps {
                sh 'trivy image mamir32825/2048:latest > trivy.txt'
            }
        }
        stage('Deploy To Kubernetes') { 
            steps {
                withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'EKS-1', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', serverUrl: 'https://A7B57D0166AAB4AF81D511377C4B8DCD.gr7.us-east-1.eks.amazonaws.com']]) {
                    sh 'kubectl apply -f deployment.yaml'
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'EKS-1', contextName: '', credentialsId: 'k8-token', namespace: 'webapps', serverUrl: 'https://A7B57D0166AAB4AF81D511377C4B8DCD.gr7.us-east-1.eks.amazonaws.com']]) {
                    sh 'kubectl get svc -n webapps'
                }
            }
        }
    }
}
