pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Pull the Docker image and run commands inside the container
                    docker.image('node:20.11.0-alpine').inside {
                        // Run necessary commands inside the container
                        sh '''
                        node --version
                        npm --version
                        npm install
                        npm run build
                        '''
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Reuse the same Docker image to run tests
                    docker.image('node:20.11.0-alpine').inside {
                        // Run tests
                        sh '''
                        npm test
                        '''
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Reuse the same Docker image to deploy the application
                    docker.image('node:20.11.0-alpine').inside {
                        // Deploy the application
                        sh '''
                        npm install netlify-cli
                        node_modules/.bin/netlify --version

                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
