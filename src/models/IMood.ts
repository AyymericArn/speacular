export default interface Mood {
    date: Date;
    mood: {
        error?: number;
        msg?: string;
        anger?: number;
        sorrow?: number;
        joy?: number;
        calm?: number;
        energy?: number;
    }
}