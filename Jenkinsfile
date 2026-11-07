pipeline {
    agent {
        label 'skillradar'
    }

    tools {
        nodejs 'NodeJS-26'
    }

    stages {
        stage('Build') {
            steps {
                sh 'pwd'
                dir('frontend') {
                    sh '''
                        node --version
                        npm --version
                        npm ci
                        npm run build
                    '''
                }
            }
        }
        stage('Unit Test') {
            steps {

            }
        }
        stage('Linting') {
            steps {

            }
        }
        stage('Cleanup') {
            steps {

            }
        }
    }
}