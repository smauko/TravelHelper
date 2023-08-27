import router from '@/router';

export default {
    name: 'Routing',
    created() {
        // Call the zavrsno method when the component is created
        this.zavrsno();
    },
    methods: {
        zavrsno() {
            const imeRute = this.printRoute();
            const routingg = ' routing...';
            const zajedno = imeRute + routingg;
            return zajedno;
        },
        printRoute() {
            const route = router.currentRoute.name;
            return route;
        },
    },
}