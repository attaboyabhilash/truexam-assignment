export function seedDatabase(para) {
    function getUUID() {
        // eslint gets funny about bitwise
        /* eslint-disable */
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const piece = (Math.random() * 16) | 0;
            const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
            return elem.toString(16);
        });
        /* eslint-enable */
    }

    para.db.collection('studentTasks').doc(getUUID()).set({
        id: para.id,
        name: 'Student 1',
        task: para.title,
        score: 0,
        image: para.imageUrl,
    })


    para.db.collection('studentTasks').doc(getUUID()).set({
        id: para.id,
        name: 'Student 2',
        task: para.title,
        score: 0,
        image: para.imageUrl,
    })

    para.db.collection('studentTasks').doc(getUUID()).set({
        id: para.id,
        name: 'Student 3',
        task: para.title,
        score: 0,
        image: para.imageUrl,
    })

    para.db.collection('studentTasks').doc(getUUID()).set({
        id: para.id,
        name: 'Student 4',
        task: para.title,
        score: 0,
        image: para.imageUrl,
    })

    para.db.collection('studentTasks').doc(getUUID()).set({
        id: para.id,
        name: 'Student 5',
        task: para.title,
        score: 0,
        image: para.imageUrl,
    })

    para.db.collection('studentTasks').doc(getUUID()).set({
        id: para.id,
        name: 'Student 6',
        task: para.title,
        score: 0,
        image: para.imageUrl,
    })

}