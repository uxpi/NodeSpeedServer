docker build -t gcr.io/axiomatic-lamp-176915/speed-node:1.1 .

gcloud docker -- push gcr.io/axiomatic-lamp-176915/speed-node:1.1

kubectl set image deployment/speed-node speed-node=gcr.io/axiomatic-lamp-176915/speed-node:1.1