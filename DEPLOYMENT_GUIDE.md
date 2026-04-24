# MERN CI/CD Project with Docker & AWS EC2 🚀

Welcome to your DevOps CI/CD project! This guide explains exactly what you have to do from your end to complete the deployment pipeline.

## Step 1: Push this project to GitHub
1. Open this folder `PEPDevOps` in your Terminal / Command Prompt.
2. Run the following commands to create a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit with MERN Docker and CI/CD"
   ```
3. Go to [GitHub](https://github.com/) and create a **New Repository**.
4. Follow the GitHub instructions to push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## Step 2: Prepare your Docker Hub
1. If you don't have one, create an account on [Docker Hub](https://hub.docker.com/).
2. Keep your `Docker Username` and `Docker Password` handy. You will need them in Step 4.

## Step 3: Set up your AWS EC2 Instance
1. Log in to your [AWS Management Console](https://aws.amazon.com/console/).
2. Search for **EC2** and click "**Launch Instance**".
3. **Name**: `mern-cicd-server`
4. **AMI**: Select **Ubuntu Server 22.04 LTS** (Free tier eligible).
5. **Instance Type**: `t2.micro` (Free tier eligible).
6. **Key Pair**: Create a new Key Pair (e.g., `mern-key`), select **RSA** and **.pem**. Download the file to your computer.
7. **Network Settings**:
   - Check **Allow SSH traffic** from anywhere.
   - Check **Allow HTTP traffic from the internet**.
   - Check **Allow HTTPS traffic from the internet**.
8. Click **Launch Instance**.
9. Once launched, click into your instance to find its **Public IPv4 address**.

## Step 4: Add GitHub Secrets
GitHub Actions uses Secrets so it won't broadcast your server passwords publicly. 
1. Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Add the following **Repository secrets**:
   - `DOCKER_USERNAME`: Your Docker Hub Username.
   - `DOCKER_PASSWORD`: Your Docker Hub Password.
   - `EC2_HOST_IP`: The Public IPv4 address from your AWS EC2 instance.
   - `EC2_SSH_KEY`: The entire contents of the `.pem` file you downloaded from AWS. (Open the file in Notepad, copy everything including `-----BEGIN RSA PRIVATE KEY-----` to `-----END RSA PRIVATE KEY-----`, and paste it).

## Step 5: Install Docker on your EC2 Instance
You need to install Docker on your server so it can run the containers.
1. Open a terminal where your downloaded `.pem` file is located, and connect to your EC2 instance:
   ```bash
   # Ensure key has correct permissions (Mac/Linux only)
   chmod 400 mern-key.pem 
   
   # SSH into the server
   ssh -i "mern-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
   ```
2. Run these commands once inside the Ubuntu server to install Docker & Docker Compose:
   ```bash
   # Update packages
   sudo apt update
   
   # Install Docker
   sudo apt install docker.io -y
   sudo apt install docker-compose -y
   
   # Start Docker and enable on boot
   sudo systemctl start docker
   sudo systemctl enable docker
   
   # Provide permission to ubuntu user (so we don't have to use sudo for everything)
   sudo usermod -aG docker ubuntu
   ```
   *(Keep your SSH window open for a minute or just log out `exit`)*

## Step 6: Trigger the Pipeline!
1. Make a tiny change to any file in your project (e.g., modify `README.md` or this guide).
2. Commit and push it:
   ```bash
   git add .
   git commit -m "Trigger deployment pipeline"
   git push
   ```
3. Go to the **Actions** tab in your GitHub repository to watch the magic! 
   - It will build your React application and Node server into Docker images.
   - Push them to Docker Hub.
   - Automatically log into your EC2 instance and run `docker-compose up`.

### Verification
Once the GitHub Action completes successfully, open your browser and navigate to:
`http://YOUR_EC2_PUBLIC_IP`
You will see your React application displaying the backend status! 🎉
