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
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    docker.image('node:20.11.0-alpine').inside {
                        sh '''
                        echo "Running tests..."
                        npm test
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    docker.image('node:20.11.0-alpine').inside {
                        sh '''
                        echo "Installing Netlify CLI..."
                        npm install netlify-cli

                        
                        '''
                    }
                }
            }
        }
    }

    
}
