# ⚙️ Local Development with HTTPS (Custom Server)

This project uses a custom `server.js` to run the Next.js app over HTTPS during local development.

---

## 🔐 Why HTTPS?

Some features like **OAuth providers (e.g. Google, LinkedIn)** or **Secure Cookies** require `https://` even in local development.  
This setup enables full-featured local development with:

- `https://localhost:3001` → secure version of your app
- `http://localhost:3000` → redirects to HTTPS

### 🛡️ Benefits of HTTPS in Local Development

- **OAuth Authentication**: Google, LinkedIn, and other OAuth providers require HTTPS for secure authentication flows
- **Secure Cookies**: Cookies with `Secure` flag only work over HTTPS
- **Service Workers**: Many modern web APIs require secure contexts
- **Browser Security Features**: Features like geolocation, camera access, and push notifications require HTTPS
- **Production Parity**: Mirror your production environment for better testing

---

## 🛠 How to Set Up SSL for Local Development

This project supports multiple SSL certificate approaches for local development:

1. **mkcert (Recommended)**: Creates locally trusted certificates
2. **OpenSSL**: Manual certificate generation
3. **External SSL providers**: Use certificates from external sources

Choose the approach that best fits your development workflow.

---

## For **macOS**

### Using `mkcert` (Recommended)

`mkcert` automatically creates locally trusted certificates that won't trigger browser warnings.

#### Step 1: Install `mkcert`

```bash
# Using Homebrew (recommended)
brew install mkcert
```

#### Step 2: Install Local CA

```bash
# Install the local CA in the system trust store
mkcert -install
```

#### Step 3: Generate Certificates

```bash
# Create ssl directory if it doesn't exist
mkdir -p ssl

# Generate certificates for localhost
mkcert -key-file ssl/key.pem -cert-file ssl/cert.pem localhost
```

---

## 🖥 For **Windows**

### Using `mkcert` (Recommended)

`mkcert` allows generating certificates trusted by your browser locally.

#### Step 1: Install `mkcert`

**Method 1: Using Chocolatey (Recommended)**

```powershell
# Install Chocolatey if not already installed
# Then install mkcert
choco install mkcert
```

**Method 2: Using Scoop**

```powershell
# Install Scoop if not already installed
# Then install mkcert
scoop install mkcert
```

**Method 3: Manual Installation**

1. Go to [mkcert releases](https://github.com/FiloSottile/mkcert/releases)
2. Download `mkcert-v*-windows-amd64.exe`
3. Rename it to `mkcert.exe`
4. Place it in a folder (e.g., `C:\mkcert`)
5. Add that folder to your **System Environment Variables → Path**

#### Step 2: Install Local CA

Open **PowerShell** or **Command Prompt** as Administrator:

```powershell
# Install the local CA in the system trust store
mkcert -install
```

#### Step 3: Generate Certificates

```powershell
# Create ssl directory if it doesn't exist
mkdir ssl

# Generate certificates for localhost
mkcert -key-file ssl/key.pem -cert-file ssl/cert.pem localhost
```

---

## 🐧 For **Linux**

### 🔧 Option A: Using `mkcert` (Recommended)

#### Step 1: Install `mkcert`

**Ubuntu/Debian:**

```bash
# Install dependencies
sudo apt install libnss3-tools

# Download and install mkcert
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

**Arch Linux:**

```bash
sudo pacman -S mkcert
```

**CentOS/RHEL/Fedora:**

```bash
# Install dependencies
sudo dnf install nss-tools  # or yum install nss-tools

# Download and install mkcert
curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
chmod +x mkcert-v*-linux-amd64
sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
```

#### Step 2: Install Local CA

```bash
# Install the local CA in the system trust store
mkcert -install
```

#### Step 3: Generate Certificates

```bash
# Create ssl directory if it doesn't exist
mkdir -p ssl

# Generate certificates for localhost
mkcert -key-file ssl/key.pem -cert-file ssl/cert.pem localhost 127.0.0.1 ::1
```

---

## 🚀 Starting the Development Server

Once you have your SSL certificates ready:

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Start the Development Server

```bash
npm run dev:https
# or
bun dev:https
```

The custom server will:

- Start the Next.js app on `https://localhost:3001` (HTTPS)
- Redirect `http://localhost:3000` to the HTTPS version
- Use the SSL certificates from the `ssl/` folder

### 3. Access Your App

Open your browser and navigate to:

- `https://localhost:3001` (primary HTTPS endpoint)
- `http://localhost:3000` (will redirect to HTTPS)

---

## 🔍 Troubleshooting

### Certificate Errors

**"Your connection is not private" / "NET::ERR_CERT_AUTHORITY_INVALID"**

This means your certificate is not trusted. Solutions:

1. **Make sure you ran `mkcert -install`** before generating certificates
2. **Clear browser cache** and restart your browser
3. **Try incognito/private browsing** to bypass cache
4. **Manually trust the certificate** in your browser settings

### Common Issues

**Port already in use:**

```bash
# Check what's using the port
lsof -i :3001  # macOS/Linux
netstat -ano | findstr :3001  # Windows

# Kill the process if needed
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

**Permission denied:**

```bash
# On macOS/Linux, you might need to use sudo for certain operations
sudo mkcert -install
```

**Browser still showing warnings:**

1. Clear browser cache and cookies
2. Restart your browser completely
3. Try a different browser to test
4. Check that the certificate includes all necessary domains (localhost, 127.0.0.1)

---

## 🔧 Custom Server Configuration

The `server.js` file in the root directory handles:

- SSL certificate loading
- HTTPS server creation
- HTTP to HTTPS redirection
- Next.js app integration

Key features:

- Automatic HTTP to HTTPS redirection
- Graceful error handling
- Hot reloading support
- Development-optimized configuration

---

## 📁 Project Structure

```
work-e/
├── server.js          # Custom HTTPS server
├── ssl/               # SSL certificates directory
│   ├── cert.pem      # SSL certificate
│   └── key.pem       # Private key
├── app/              # Next.js app directory
└── ...
```

---
