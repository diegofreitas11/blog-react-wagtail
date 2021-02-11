<h1 align="center">Blog com ReactJs e Wagtail.</h1>

<p align="center">Fiz essa SPA de um blog utilizando React.JS e o CMS Wagtail (para quem não sabe é um CMS que utiliza Django/Python).</p>

<h2 align="center">Instalações necessárias.</h2>

<h3 align="center">Front end.</h3>

<p align="center">É necessário instalar as ferramentas <a href='https://git-scm.com'>Git</a>, <a href='https://nodejs.org/'>Node.js</a> e <a href='https://pt-br.reactjs.org/'>ReactJs</a>. Também utilize o gerencionar de pacotes de sua preferência: NPM (já vem com o Node) e <a href='https://classic.yarnpkg.com/pt-BR/docs/install/'>Yarn </a>.</p>

<h3 align="center">Back end.</h3>

<p align="center">É necessário instalar o <a href='https://www.python.org/downloads/'>Python</a>. A partir daí é possível instalar o Django e o Wagtail pelos comandos: </p>

```bash
pip install django

pip install wagtail
```

<h2 align="center">Como testar</h2>


<h3 align="center">Back end.</h3>

1. Clone o projeto no repositório de preferência: 
```bash
git clone <https://github.com/diegofreitas11/blog-react-wagtail.git>
```

2. Acesse:

```bash
cd blog-react-wagtail/blogBackend
```

3. Ative o ambiente virtual:

```bash
source venv/bin/activate
```

4. Rode o projeto:

```bash
python manage.py runserver
```
ou

```bash
python3 manage.py runserver
```

<h3 align="center">Front end.</h3>

1. Em outra janela do terminal, acesse a pasta do projeto:
```bash
cd blog-react-wagtail
```

2. Rode o projeto em desenvolvimento:
```bash
yarn start
```
ou
```bash
npm start
```

3. Acesse o endereço http://localhost:3000/ pelo navegador.
