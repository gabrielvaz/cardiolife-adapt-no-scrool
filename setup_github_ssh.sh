#!/bin/bash

# Script para configurar autenticação SSH do GitHub
# Gabriel Vaz - Cardiolife Project

echo "🔐 Configurando autenticação SSH para GitHub"
echo "=============================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se já existe uma chave SSH
echo "1️⃣ Verificando chaves SSH existentes..."
if [ -f ~/.ssh/id_ed25519.pub ] || [ -f ~/.ssh/id_rsa.pub ]; then
    echo -e "${GREEN}✓ Chave SSH encontrada!${NC}"
    echo ""
    echo "Sua chave pública é:"
    echo "-------------------"
    if [ -f ~/.ssh/id_ed25519.pub ]; then
        cat ~/.ssh/id_ed25519.pub
    else
        cat ~/.ssh/id_rsa.pub
    fi
    echo "-------------------"
    echo ""
    echo -e "${YELLOW}Ação necessária:${NC}"
    echo "1. Copie a chave acima (já está selecionada)"
    echo "2. Acesse: https://github.com/settings/keys"
    echo "3. Clique em 'New SSH key'"
    echo "4. Cole a chave e salve"
    echo ""
    read -p "Pressione ENTER quando terminar de adicionar a chave no GitHub..."
else
    echo -e "${YELLOW}⚠ Nenhuma chave SSH encontrada.${NC}"
    echo ""
    read -p "Digite seu email do GitHub: " github_email
    
    echo ""
    echo "2️⃣ Gerando nova chave SSH..."
    ssh-keygen -t ed25519 -C "$github_email" -f ~/.ssh/id_ed25519 -N ""
    
    echo -e "${GREEN}✓ Chave SSH gerada!${NC}"
    echo ""
    echo "Sua chave pública é:"
    echo "-------------------"
    cat ~/.ssh/id_ed25519.pub
    echo "-------------------"
    echo ""
    echo -e "${YELLOW}Ação necessária:${NC}"
    echo "1. Copie a chave acima"
    echo "2. Acesse: https://github.com/settings/keys"
    echo "3. Clique em 'New SSH key'"
    echo "4. Cole a chave e dê um nome (ex: 'Mac - Cardiolife')"
    echo "5. Clique em 'Add SSH key'"
    echo ""
    read -p "Pressione ENTER quando terminar de adicionar a chave no GitHub..."
fi

# Adicionar chave ao ssh-agent
echo ""
echo "3️⃣ Adicionando chave ao ssh-agent..."
eval "$(ssh-agent -s)"

# Adicionar ao ssh-agent
if [ -f ~/.ssh/id_ed25519 ]; then
    ssh-add ~/.ssh/id_ed25519
else
    ssh-add ~/.ssh/id_rsa
fi

# Criar/atualizar config SSH
echo ""
echo "4️⃣ Configurando SSH config..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

if [ ! -f ~/.ssh/config ] || ! grep -q "Host github.com" ~/.ssh/config; then
    cat >> ~/.ssh/config << EOF

# GitHub Configuration
Host github.com
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
EOF
    echo -e "${GREEN}✓ SSH config atualizado${NC}"
else
    echo -e "${GREEN}✓ SSH config já configurado${NC}"
fi

# Testar conexão
echo ""
echo "5️⃣ Testando conexão com GitHub..."
ssh -T git@github.com 2>&1 | grep -q "successfully authenticated" && \
    echo -e "${GREEN}✓ Autenticação bem-sucedida!${NC}" || \
    echo -e "${YELLOW}⚠ Teste a conexão manualmente: ssh -T git@github.com${NC}"

# Configurar git global
echo ""
echo "6️⃣ Configurando Git globalmente..."
read -p "Digite seu nome para commits (ex: Gabriel Vaz): " git_name
read -p "Digite seu email do Git: " git_email

git config --global user.name "$git_name"
git config --global user.email "$git_email"

echo -e "${GREEN}✓ Git configurado globalmente${NC}"

# Mostrar configuração atual
echo ""
echo "📋 Configuração atual do Git:"
echo "Nome: $(git config --global user.name)"
echo "Email: $(git config --global user.email)"

echo ""
echo -e "${GREEN}🎉 Configuração concluída!${NC}"
echo ""
echo "Próximos passos:"
echo "1. Execute: git remote set-url origin git@github.com:gabrielvaz/cardiolife-adapt-no-scrool.git"
echo "2. Execute: git push -u origin main"
echo ""
