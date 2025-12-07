document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    

    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('title', 'Ocultar senha');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('title', 'Mostrar senha');
            }
        });
    }
    

    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            validateUsername(this.value);
        });
        
        usernameInput.addEventListener('blur', function() {
            validateUsername(this.value);
        });
    }
    
   
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this.value);
        });
        
        passwordInput.addEventListener('blur', function() {
            validatePassword(this.value);
        });
    }
    

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            const rememberMe = document.getElementById('rememberMe').checked;
            
        
            const isUsernameValid = validateUsername(username);
            const isPasswordValid = validatePassword(password);
            
      
            if (isUsernameValid && isPasswordValid) {
            
                showLoading(true);
                
         
                setTimeout(function() {
                    showLoading(false);
                    
         
                    const loginSuccess = simulateLogin(username, password);
                    
                    if (loginSuccess) {
                        showMessage('Login realizado com sucesso! Redirecionando...', 'success');
                        
                       
                        setTimeout(function() {
                            alert(`Bem-vindo, ${username}! Login simulado com sucesso.\n\nLembrar-me: ${rememberMe ? 'Sim' : 'Não'}`);
                            
                        }, 1500);
                    } else {
                        showMessage('Credenciais inválidas. Tente novamente.', 'error');
                        shakeForm();
                    }
                }, 1500);
            } else {
                if (!isUsernameValid) {
                    usernameInput.focus();
                } else if (!isPasswordValid) {
                    passwordInput.focus();
                }
            }
        });
    }
    
   
    function validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9_]{3,20}$/;
        const isValid = usernameRegex.test(username);
        
       
        if (username === '') {
            usernameInput.classList.remove('valid', 'invalid');
            clearValidationMessage(usernameInput);
        } else if (isValid) {
            usernameInput.classList.remove('invalid');
            usernameInput.classList.add('valid');
            showValidationMessage(usernameInput, 'Usuário válido', 'success');
        } else {
            usernameInput.classList.remove('valid');
            usernameInput.classList.add('invalid');
            showValidationMessage(usernameInput, 'Usuário deve ser um e-mail válido ou ter entre 3-20 caracteres (apenas letras, números, _, ., -)', 'error');
        }
        
        return isValid;
    }
    
   
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
        const isValid = passwordRegex.test(password);
        
        
        if (password === '') {
            passwordInput.classList.remove('valid', 'invalid');
            clearValidationMessage(passwordInput);
        } else if (isValid) {
            passwordInput.classList.remove('invalid');
            passwordInput.classList.add('valid');
            showValidationMessage(passwordInput, 'Senha válida', 'success');
        } else {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('invalid');
            showValidationMessage(passwordInput, 'A senha deve ter pelo menos 6 caracteres, incluindo uma letra e um número', 'error');
        }
        
        return isValid;
    }
    
   
    function showValidationMessage(inputElement, message, type) {
       
        clearValidationMessage(inputElement);
        
     
        const messageElement = document.createElement('div');
        messageElement.className = `validation-message ${type}`;
        messageElement.textContent = message;

        inputElement.parentNode.parentNode.appendChild(messageElement);
    }
    

    function clearValidationMessage(inputElement) {
        const parent = inputElement.parentNode.parentNode;
        const existingMessage = parent.querySelector('.validation-message');
        
        if (existingMessage) {
            parent.removeChild(existingMessage);
        }
    }
    

    function showLoading(show) {
        const submitButton = loginForm.querySelector('.btn-login');
        const originalText = submitButton.innerHTML;
        
        if (show) {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processando...';
            submitButton.disabled = true;
        } else {
            submitButton.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Entrar';
            submitButton.disabled = false;
        }
    }
    

    function showMessage(message, type) {

        const existingMessages = document.querySelectorAll('.alert-message');
        existingMessages.forEach(msg => msg.remove());

        const messageElement = document.createElement('div');
        messageElement.className = `alert-message alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
        messageElement.textContent = message;
        messageElement.style.borderRadius = '10px';
        messageElement.style.textAlign = 'center';
        

        loginForm.appendChild(messageElement);
        

        setTimeout(function() {
            if (messageElement.parentNode) {
                messageElement.style.opacity = '0';
                messageElement.style.transition = 'opacity 0.5s';
                setTimeout(function() {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 500);
            }
        }, 4000);
    }
    

    function simulateLogin(username, password) {

        const validCredentials = [
            { username: 'admin@exemplo.com', password: 'Admin123' },
            { username: 'usuario', password: 'Usuario123' },
            { username: 'teste@exemplo.com', password: 'Teste123' }
        ];
        

        return validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
    }
    

    function shakeForm() {
        const loginCard = document.querySelector('.login-card');
        loginCard.style.animation = 'shake 0.5s';
        

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
        
  
        setTimeout(function() {
            loginCard.style.animation = '';
            document.head.removeChild(style);
        }, 500);
    }
    

    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('border-primary', 'border-2');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('border-primary', 'border-2');
        });
    });
    
 
    console.log('Credenciais de exemplo para teste:');
    console.log('1. admin@exemplo.com / Admin123');
    console.log('2. usuario / Usuario123');
    console.log('3. teste@exemplo.com / Teste123');
});