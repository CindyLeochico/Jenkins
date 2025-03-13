pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.image('node:20.11.0-alpine').inside {
                        sh '''
                        node --version
                        npm --version
                        npm install
                        npm run build
                        '''
                        reuseNode(true)
                    }
                }
            }
        }
    }
}
