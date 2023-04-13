# SpeakSubs 🎬📝🔍

SpeakSubs é um sistema que permite carregar arquivos de legendas em diversos formatos, processar o texto e suas características, e permitir que o usuário busque por filmes ou episódios de séries através de características das cenas.

## Funcionalidades 🚀

* Carregar arquivos de legendas em diversos formatos, como SRT e VTT 📂
* Extrair o texto das legendas e suas características, como tempo, duração e posição na tela 🕒
* Permitir que o usuário busque por filmes ou episódios de séries através de características das cenas, como diálogos, ações e emoções. 🔍

## Requisitos 📋
O sistema ainda está em fase inicial e nesta fase deve atender aos seguintes requisitos:

* Permitir o upload de arquivos de legendas em diferentes formatos 📤
* Extrair o texto das legendas e suas características, como tempo, duração e posição na tela 🕑
* Armazenar os dados extraídos em um banco de dados 💾
* Permitir a busca de filmes ou episódios de séries através de características das cenas 🔍
* Exibir os resultados da busca em uma interface amigável e intuitiva 🖥️

## Tecnologias utilizadas 🛠️

* Node.js
* Express
* MongoDB
* Python
* OpenCV
* NLTK
* Scikit-learn
  
## Como Contribuir 🤝

- Faça um fork deste repositório.
- Clone o fork em sua máquina.
- Crie uma branch para suas alterações: git checkout -b feature/minha-alteracao
- Faça as alterações desejadas.
- Faça um commit com suas alterações: git commit -m "Minha alteração"
- Faça push da branch: git push origin feature/minha-alteracao
- Crie um pull request para a branch main deste repositório.


## Instalação e configuração


### Clone o repositório do projeto:

```bash
git clone https://github.com/dinhostork/speaksubs.git
```

### Acesse o diretório do projeto:
```bash
cd speaksubs
```

### Instale as dependências:
```bash
npm install ou yarn install
```

### Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```env
MONGODB_URI= url do banco de dados
MONGODB_URI_TEST= url do banco de dados de teste
APLICATION_PORT=porta_do_servidor
API_VERSION=1
API_URL=URL da api
ENVIROMENT=development

```

### Inicie o servidor:

```bash
npm dev or yarn dev
```

### Acesse o sistema em seu navegador em:

```bash
http://localhost:<porta_do_servidor>
```
