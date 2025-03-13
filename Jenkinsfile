pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Pull the docker image and run commands inside the container
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
    }
}
