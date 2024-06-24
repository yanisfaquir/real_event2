import Link from 'next/link';
import GlobalButton from '@/components/globalButton';


const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 mt-5">Política de Privacidade e Cookies</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Introdução</h2>
        <p>
          Bem-vindo à nossa plataforma. Valorizamos a sua privacidade e estamos comprometidos em proteger os seus dados pessoais. Esta Política de Privacidade e Cookies explica como recolhemos, usamos, armazenamos e protegemos as suas informações pessoais quando utiliza o nosso site.
        </p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Informações que Recolhemos</h2>
        <h3 className="text-xl font-semibold mb-2">Informações Pessoais</h3>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Nome:</strong> Para identificar e comunicar consigo.</li>
          <li><strong>Data de Nascimento:</strong> Para verificar a sua idade e adequação aos nossos serviços.</li>
          <li><strong>Telefone:</strong> Para contato direto, se necessário.</li>
          <li><strong>Email:</strong> Para comunicações e envio de informações importantes.</li>
          <li><strong>Localidade:</strong> Para personalizar os serviços e informações de acordo com sua região.</li>
          <li><strong>Endereço:</strong> Para envio de materiais ou comunicações físicas, se aplicável.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Informações de Uso</h3>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Dados de Navegação:</strong> Inclui o endereço IP, tipo de navegador, páginas visitadas, tempo gasto nas páginas e outras estatísticas.</li>
          <li><strong>Cookies:</strong> Utilizamos cookies para melhorar a sua experiência no nosso site, personalizar conteúdos e anúncios, fornecer funcionalidades de redes sociais e analisar o nosso tráfego.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Como Utilizamos as suas informações</h2>
        <p>
          As suas informações são utilizadas para os seguintes propósitos:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Fornecimento de Serviços:</strong> Para operar e manter o nosso site e serviços.</li>
          <li><strong>Melhoria dos Serviços:</strong> Para entender melhor como os nossos serviços são utilizados e fazer melhorias.</li>
          <li><strong>Comunicações:</strong> Para enviar notificações importantes, como atualizações de serviços, ofertas promocionais e outras informações relevantes.</li>
          <li><strong>Personalização:</strong> Para personalizar a sua experiência com base nas suas preferências e localização.</li>
          <li><strong>Segurança:</strong> Para monitorar e prevenir fraudes, proteger contra ameaças e garantir a segurança do nosso site.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Partilha de Informações</h2>
        <p>
          Não vendemos, trocamos ou alugamos as suas informações pessoais para terceiros. Podemos partilhar informações com:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Parceiros de Serviço:</strong> Terceiros que nos ajudam a operar nosso no site, conduzir os nossos negócios ou fornecer serviços a si, desde que concordem em manter essas informações confidenciais.</li>
          <li><strong>Autoridades Legais:</strong> Quando exigido por lei, para cumprir com uma intimação, processo judicial ou investigação governamental.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Segurança dos Dados</h2>
        <p>
          Implementámos medidas de segurança para proteger as suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Os seus Direitos</h2>
        <p>
          Você tem o direito de:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Aceder e Retificar:</strong> Solicitar acesso e correção das suas informações pessoais.</li>
          <li><strong>Excluir:</strong> Solicitar a exclusão dos seus dados pessoais, sujeitos a certas exceções.</li>
          <li><strong>Portabilidade:</strong> Solicitar a transferência das suas informações pessoais para outro fornecedor de serviços.</li>
          <li><strong>Recusar Marketing:</strong> Optar por não receber comunicações de marketing.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Cookies</h2>
        <p>
          Utilizamos cookies para:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Autenticação:</strong> Mantê-lo logado no nosso site.</li>
          <li><strong>Sessão:</strong> Armazenar informações temporárias durante a sua visita.</li>
          <li><strong>Preferências:</strong> Lembrar das suas preferências e configurações.</li>
          <li><strong>Análise:</strong> Entender como você usa o nosso site e onde podemos melhorá-lo.</li>
        </ul>
        <p>
          Você pode gerir ou desativar as cookies nas configurações do seu navegador. Note que se desativar as cookies pode afetar a funcionalidade do site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Alterações a Esta Política</h2>
        <p>
          Podemos atualizar esta Política de Privacidade e Cookies periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página. Recomendamos rever esta política regularmente para se manter informado sobre como protegemos as suas informações.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Contato</h2>
        <p>
          Se tiver dúvidas ou preocupações sobre esta política ou sobre as práticas de privacidade do nosso site, entre em contato conosco através do email: mctwrealevent@hotmail.com.
        </p>
      </section>

      <div className="text-center">
      <GlobalButton
          type="secondary"
          path="/"
          text="Voltar à Homepage"
          size="small"
        />    
      </div>
    </div>
  );
};

export default PrivacyPolicy;
