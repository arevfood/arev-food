import { diseaseData } from "@/data/disease";

export const diseaseSearch = (query: string) => {
    const queryFiltered = query.trim().toLowerCase();
    if (!queryFiltered) return [];
    return diseaseData.filter(
        (disease) =>
            disease.label.toLowerCase().includes(queryFiltered) ||
            disease.aliases?.some((alias) => alias.toLowerCase().includes(queryFiltered))
    );
};