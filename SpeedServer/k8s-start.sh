docker build -t gcr.io/axiomatic-lamp-176915/speed-node:2.5 .

gcloud docker -- push gcr.io/axiomatic-lamp-176915/speed-node:2.5

gcloud container clusters get-credentials node-speed-cluster --zone us-central1-a

kubectl set image deployment/speed-node speed-node=gcr.io/axiomatic-lamp-176915/speed-node:2.5
