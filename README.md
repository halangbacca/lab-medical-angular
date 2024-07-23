# LABMedical

- Software para gestão de inventário médico, desenvolvido utilizando HTML5, CSS3, JavaScript, TypeScript, Angular (15.1.1), Bootstrap (5.3.0-alpha1), Angular Material, JSON Server e SweetAlert2.

<img src="/src/assets/img/main.jpeg?" alt="main">

> Tela inicial do LABMedical.

## Inicialização

- Após clonar o projeto: npm install.
- Caso encontre alguma vulnerabilidade: npm audit fix.
- Inicializar o projeto com ng serve --o (localhost:4200).
- Inicializar o JSON Server com o comando npm start (localhost:3000).

## Funcionalidades

- Página de login com criação de usuário e recuperação de senha.
- Menu lateral responsivo com atalhos para as funcionalidades.
- Toolbar exibindo o nome da página e nome do usuário (médico).
- Página inicial contendo estatísticas de pacientes, consultas, exames e informações básicas sobre os pacientes.
- Página de cadastro de paciente com validações e implementação da API ViaCEP, retornando o endereço a partir do CEP informado pelo usuário.
- Páginas de cadastro de consultas e exames com validações.
- Páginas de listagem de prontuário, consultas e exames com caixa de pesquisa.
- Página de prontuário do paciente, permitindo a edição e exclusão de pacientes, consultas e exames.
- Utilização do Angular Guard, impedindo o acesso não autenticado à páginas do sistema.

## Adicionais

- Adicionado delay de 200 ms no JSON Server para a exibição correta da animação de carregamento.
- Criação de pipe que calcula a idade do paciente com base na data de nascimento informada.
- Utilização dos componentes spinner e stepper do Angular Material.
- Utilização de JSON Server para armazenamento dos dados.
- Impede o cadastro de pacientes e usuários duplicados.
- Botão que retorna o usuário ao início da página.
- Implementação do SweetAlert2.
