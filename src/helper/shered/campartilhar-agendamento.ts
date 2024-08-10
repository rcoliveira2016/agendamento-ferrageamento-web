import { useCompartilharTexto } from "@/core/shered/shered-texto";

export type CampartilharAgendamento = {
  DataProxima: Date;
  DataUltimo?: Date;
  Observacoes?: string;
};

export const useCampartilharAgendamento = (data: CampartilharAgendamento) => {
  const linha = "\n";
  const retorno = [];

  retorno.push("Olá! 🐎");
  retorno.push(linha);
  retorno.push(linha);
  retorno.push(
    "Espero que você e seu(s) cavalo(s) estejam bem! Seguem as informações sobre o próximo atendimento:"
  );
  retorno.push(linha);
  retorno.push(linha);

  if (data.DataUltimo)
    retorno.push(
      `📅 Última Data de Atendimento: ${data.DataUltimo.toLocaleDateString()}${linha}`
    );

  retorno.push(
    `📅 Data do Atendimento: ${data.DataProxima.toLocaleDateString()}`
  );
  retorno.push(linha);
  if (data.Observacoes)
    retorno.push(`📝 Observações: ${data.Observacoes}${linha}`);

  retorno.push(linha);
  retorno.push(
    "Estou à disposição para qualquer dúvida ou necessidade. Tenha um ótimo dia!"
  );

  const texto = retorno.join("");
  useCompartilharTexto(texto);
};
