export default {
    data () {
        return {
            'routes': [
                'homepage',
                'about'
            ]
        };
    },
    'name': 'Navigation',
    'template':

        /* html */
        `<nav class="block">
            <ul class="flex bg-white p-4">
                <li v-for="route in routes" class="ml-4">
                    <router-link :to="{'name': route}" exact class="border-b-2 hover:border-blue-400">{{route.charAt(0).toUpperCase() + route.slice(1)}}</router-link>
                </li>
            </ul>
        </nav>`
};
