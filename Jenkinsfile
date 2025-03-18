pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = 'ee2694dc3-65b5-4d5d-aa33-1f5b96e21731'
        NETLIFY_AUTH_TOKEN = credentials('new-token')  // ✅ Fixed the variable name
    }

    stages {
        stage('Build') {
            steps {
                script {
                    try {
                        echo "Pulling Node image..."
                        docker.image('node:20.11.0-alpine').pull()

                        docker.image('node:20.11.0-alpine').inside {
                            sh '''
                            echo "Node and NPM versions:"
                            node --version
                            npm --version

                            echo "Installing dependencies..."
                            npm install

                            echo "Building the project..."
                            npm run build
                            '''
                        }
                    } catch (Exception e) {
                        error "Build stage failed: ${e.message}"
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        docker.image('node:20.11.0-alpine').inside {
                            sh '''
                            echo "Running tests..."
                            npm test
                            '''
                        }
                    } catch (Exception e) {
                        error "Test stage failed: ${e.message}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                        docker.image('node:20.11.0-alpine').inside {
                            sh '''
                            echo "Installing Netlify CLI..."
                            npm install netlify-cli

                            echo "Netlify CLI version:"
                            node_modules/.bin/netlify --version

                            echo "Deploying to Site ID: $NETLIFY_SITE_ID"
                            node_modules/.bin/netlify status
                            node_modules/.bin/netlify deploy --prod --dir=build
                            '''
                        }
                    } catch (Exception e) {
                        error "Deploy stage failed: ${e.message}"
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
            echo 'Build, test, and deployment succeeded! 🎉'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
    }
}
