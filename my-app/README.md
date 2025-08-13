# 🚀 ArgoCD Learning Hub

A beautiful, interactive web application designed specifically for learning ArgoCD and GitOps concepts.

## 📋 Project Overview

This project demonstrates a complete GitOps workflow using ArgoCD with:
- ✨ **Beautiful Custom Website**: Interactive one-page application with ArgoCD-themed content
- 🔄 **GitOps Workflow**: Automated deployment from Git repository
- 🛡️ **Self-Healing**: ArgoCD automatically corrects configuration drift
- 📊 **Monitoring**: Health checks and status monitoring
- 🎯 **Learning Resources**: Built-in educational content about ArgoCD

## 🏗️ Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│   GitHub Repo       │────┤      ArgoCD         │────┤   Kubernetes        │
│   (Source of Truth) │    │   (GitOps Engine)   │    │    (Target)         │
│                     │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

## 📁 Project Structure

```
my-app/
├── deployment.yaml     # Kubernetes Deployment with 3 replicas
├── service.yaml        # NodePort Service (accessible on :30080)
├── configmap.yaml      # Website content and nginx configuration
├── application.yaml    # ArgoCD Application manifest
├── website/           # Original website source files
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Dockerfile         # Docker image build instructions
├── nginx.conf         # Custom nginx configuration
└── README.md         # This file
```

## 🎨 Website Features

### Interactive Elements
- **📊 Animated Counters**: Live statistics with smooth animations
- **🎯 Feature Cards**: Hover effects and click interactions
- **💻 Terminal Simulation**: Live command typing animation
- **📱 Responsive Design**: Works perfectly on all devices

### Educational Content
- **GitOps Concepts**: Clear explanations of ArgoCD benefits
- **Live Demo Section**: Simulated terminal showing ArgoCD commands
- **Status Monitoring**: Real-time application health indicators
- **Best Practices**: Built-in examples of Kubernetes configurations

## 🚀 Quick Start

### Prerequisites
- Kubernetes cluster (minikube, kind, k3s, or cloud provider)
- ArgoCD installed in your cluster
- kubectl configured to access your cluster

### 1. Deploy ArgoCD (if not already installed)
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD to be ready
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd
```

### 2. Access ArgoCD UI
```bash
# Port forward to access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

### 3. Push Code to GitHub
```bash
cd /path/to/your/argocd/folder
git add my-app/
git commit -m "Add ArgoCD Learning Hub application"
git push origin main
```

### 4. Deploy Application
```bash
# Apply ArgoCD application
kubectl apply -f my-app/application.yaml

# Check status
kubectl get applications -n argocd
```

### 5. Access Your Website
```bash
# If using minikube
minikube service argocd-learning-app-service

# If using kind/k3s/docker-desktop
# Visit: http://localhost:30080

# Check pod status
kubectl get pods -l app=argocd-learning-app
```

## 🔍 Monitoring & Debugging

### Check Application Status
```bash
# ArgoCD CLI
argocd app get argocd-learning-app

# Kubectl
kubectl get applications -n argocd
kubectl describe application argocd-learning-app -n argocd
```

### Check Pods and Services
```bash
# View pods
kubectl get pods -l app=argocd-learning-app
kubectl logs -l app=argocd-learning-app

# Check service
kubectl get svc argocd-learning-app-service
kubectl describe svc argocd-learning-app-service
```

### Health Checks
```bash
# Test health endpoint
kubectl port-forward svc/argocd-learning-app-service 8080:80
curl http://localhost:8080/health

# Test API endpoint
curl http://localhost:8080/api/status
```

## 🎓 Learning Exercises

### Beginner Level
1. **Change Replica Count**: Modify replicas in `deployment.yaml` from 3 to 5, push to Git, observe auto-sync
2. **Update Content**: Edit the website title in `configmap.yaml` and watch ArgoCD sync changes
3. **Scale Down**: Test scaling from 5 replicas back to 2

### Intermediate Level
1. **Add Environment Variable**: Add new environment variables to the deployment
2. **Update Resources**: Modify CPU/memory limits and observe rolling updates
3. **Service Type**: Change from NodePort to LoadBalancer (if supported)

### Advanced Level
1. **Add Ingress**: Create an Ingress resource for the application
2. **Multi-Environment**: Create staging and production variants
3. **Helm Integration**: Convert to Helm chart for better templating

## 🛠️ Customization

### Update Website Content
Edit the `index.html` section in `configmap.yaml`:
```yaml
data:
  index.html: |
    <!-- Your custom HTML here -->
```

### Modify nginx Configuration
Update the `default.conf` section in `configmap.yaml`:
```yaml
data:
  default.conf: |
    server {
      # Your custom nginx config
    }
```

## 📊 Key Metrics & Endpoints

| Endpoint | Description |
|----------|-------------|
| `/` | Main application |
| `/health` | Health check (returns 200 OK) |
| `/api/status` | JSON status endpoint |

## 🔧 Troubleshooting

### Common Issues

**Application Not Syncing?**
```bash
# Force sync
argocd app sync argocd-learning-app

# Check sync status
argocd app get argocd-learning-app --hard-refresh
```

**Pods Not Starting?**
```bash
# Check pod events
kubectl describe pods -l app=argocd-learning-app

# Check logs
kubectl logs -l app=argocd-learning-app --previous
```

**Service Not Accessible?**
```bash
# Check service endpoints
kubectl get endpoints argocd-learning-app-service

# Test internal connectivity
kubectl run debug --image=busybox -it --rm -- wget -qO- argocd-learning-app-service
```

## 🎯 Learning Outcomes

After completing this project, you'll understand:
- ✅ GitOps principles and workflow
- ✅ ArgoCD application deployment and management
- ✅ Kubernetes ConfigMaps and Deployments
- ✅ Service exposure and networking
- ✅ Health checks and monitoring
- ✅ Automated sync and self-healing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Additional Resources

- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [GitOps Principles](https://www.weave.works/technologies/gitops/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

---

**Happy Learning! 🎉**

*This project is designed to make ArgoCD learning interactive and fun. Experiment, break things, and learn from the experience!*