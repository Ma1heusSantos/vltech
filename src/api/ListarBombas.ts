import api from "../services/api";

interface Response extends globalThis.Response {
  json: () => Promise<{ data: any; message: string }>;
}

const getAllPump = async () =>
  api
    .get<{ data: any[]; message: string }>(`/ultimosabast/list/`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error("ERROR ? Falha ao obter as bombas: ", error);
      throw error;
    });

export default getAllPump;
