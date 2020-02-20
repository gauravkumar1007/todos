const Storage = {
    get(k: string) {
        try {
            return JSON.parse(localStorage.getItem(k) || "");
        } catch (e) {
            return null;
        }
    },
    set(k: string, v: any) {
        localStorage.setItem(k, JSON.stringify(v));
    },
    remove(k: string){
        localStorage.removeItem(k);
    },
    clearAll(){
        localStorage.clear()
    }
};

export default Storage;