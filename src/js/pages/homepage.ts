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
    'data': () => ({'replace': App._route.name}),
    // 'data': () => ({'replace': 'homepage'}),
    'template':

        /* html */
        `<PageContainer>
            <Navigation />
            <div>{{replace}}</div>
            <Footer />
        </PageContainer>`
};
