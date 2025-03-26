pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '1af14fb7-1c1e-4ad0-9a81-620d6b898e63'
        NETLIFY_AUTH_TOKEN = credentials('myname-token')  
    }

    stages {
        stage('Build') {
            steps {
                script {
                    echo "Pulling Node image..."
                    docker.image('node:20.11.0-alpine').pull()

                    docker.image('node:20.11.0-alpine').inside {
                        sh '''
                        echo "Checking Node and NPM versions..."
                        node --version
                        npm --version

                        echo "Installing dependencies..."
                        npm ci

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
                        echo "Installing Netlify CLI globally..."
                        npm install -g netlify-cli --legacy-peer-deps

                        echo "Checking Netlify CLI version..."
                        netlify --version

                        echo "Deploying to production. Site ID: $NETLIFY_SITE_ID"
                        netlify status
                        netlify deploy --prod --dir=build
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
