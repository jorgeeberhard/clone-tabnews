import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let maxConnectionsText = "Carregando...";
  let versionText = "Carregando...";
  let openedConnectionsText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    maxConnectionsText = data.dependencies.database.max_connections;
    versionText = data.dependencies.database.version;
    openedConnectionsText = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <p>Última atualização: {updatedAtText}</p>
      <div>
        <h2>Database</h2>
        <p>Versão: {versionText}</p>
        <p>Conexões abertas: {openedConnectionsText}</p>
        <p>Conexões máximas: {maxConnectionsText}</p>
      </div>
    </div>
  );
}
