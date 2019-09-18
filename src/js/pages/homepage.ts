import Footer from '../components/footer';
import PageContainer from '../components/page-container';
import Navigation from '../components/navigation';

export default {
    'components': {
        PageContainer,
        Footer,
        Navigation
    },
    'data': () => ({'dynamicContent': 'I am the dynamic content'}),
    'template':

        /* html */
        `<PageContainer>
            <Navigation />
            <div>Home Page - {{dynamicContent}}</div>
            <Footer />
        </PageContainer>`
};
