import App from '../components/app';
import Footer from '../components/footer';
import PageContainer from '../components/page-container';
import Navigation from '../components/navigation';

export default {
    'components': {
        PageContainer,
        Footer,
        Navigation
    },
    'props': {
        'resource': {
            'required': true,
            'type': String
        }
    },
    'template':

        /* html */
        `<PageContainer>
            <Navigation />
            <div>
                <h1>{{resource}} not found</h1>
                <router-link :to="{'name': 'homepage'}" exact>Click here to go home</router-link>
            </div>
            <Footer />
        </PageContainer>`
};
