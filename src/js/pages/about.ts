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
    'template':

        /* html */
        `<PageContainer>
            <Navigation />
            <div>About</div>
            <Footer />
        </PageContainer>`
};
