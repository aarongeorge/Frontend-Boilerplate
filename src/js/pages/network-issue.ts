import Footer from '../components/footer';
import PageContainer from '../components/page-container';
import Navigation from '../components/navigation';

export default {
    'components': {
        PageContainer,
        Footer,
        Navigation
    },
    'template':

        /* html */
        `<PageContainer>
            <Navigation />
            <div>
                <h1>It looks you're experiencing some network issues, please click the back button and try again.</h1>
                <router-link :to="{'name': 'homepage'}" exact>Click here to go home</router-link>
            </div>
            <Footer />
        </PageContainer>`
};
