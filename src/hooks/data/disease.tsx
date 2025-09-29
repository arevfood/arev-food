import { useState, useMemo, useCallback } from "react";
import { diseaseData } from "@/data/disease";
import { FilterDiseaseModel } from "@/models/filter-list";
import { DiseaseDetailsModel } from "@/models/disease-details";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const entity = "disease";
const baseUrl = import.meta.env.VITE_AI_TOOLS_BASE_URL;

export const useDiseases = ({
    limit = 10,
    page = 1,
}: {
    limit?: number;
    page?: number;
}) => {
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);

    const onSearch = useCallback(async (query: string, recentPage?: number) => {
        setLoading(true);
        setSearchValue(query);

        const lower = query.trim().toLowerCase();
        let result: FilterDiseaseModel[];

        const currentPage = recentPage ?? page;
        const start = (currentPage - 1) * limit;

        if (!lower) {
            result = diseaseData.slice(start, start + limit);
        } else {
            const filtered = diseaseData.filter((item: FilterDiseaseModel) => {
                const inKey = item.key.toLowerCase().includes(lower);
                const inLabel = item.label.toLowerCase().includes(lower);
                const inDesc = item.description?.toLowerCase().includes(lower);
                const inAliases = item.aliases?.some((a) => a.toLowerCase().includes(lower));
                return inKey || inLabel || inDesc || inAliases;
            });

            result = filtered.slice(start, start + limit);
        }

        setLoading(false);
        return result;
    }, [limit, page]);

    const data = useMemo(() => {
        const query = searchValue.trim().toLowerCase();
        if (!query) {
            const start = (page - 1) * limit;
            return diseaseData.slice(start, start + limit);
        }

        const filtered = diseaseData.filter((item: FilterDiseaseModel) => {
            const inKey = item.key.toLowerCase().includes(query);
            const inLabel = item.label.toLowerCase().includes(query);
            const inDesc = item.description?.toLowerCase().includes(query);
            const inAliases = item.aliases?.some((a) => a.toLowerCase().includes(query));
            return inKey || inLabel || inDesc || inAliases;
        });

        const start = (page - 1) * limit;
        return filtered.slice(start, start + limit);
    }, [searchValue, page, limit]);

    return {
        data,
        loading,
        onSearch,
    };
};

export const useDisease = ({ slug }: { slug?: string }) => {
    const { data: data, isLoading: fetchLoading } = useQuery({
        queryKey: [entity, slug],
        queryFn: async () => {
            const result = await axios.get(`${baseUrl}/disease/${slug}`);
            return result.data.disease as DiseaseDetailsModel;
        },
        enabled: !!slug,
    });

    return { data, loading: fetchLoading };
};
