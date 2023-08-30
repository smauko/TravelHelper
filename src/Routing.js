import router from '@/router';

export default { 
    name: 'Routing',
    created() {
        this.zavrsno(); // pozovi kada je gotovo
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