function sortTeams() {
    // Pegar os nomes dos jogadores separados por linhas, remover espaços extras e linhas vazias
    const names = document.getElementById("names").value
        .split('\n')
        .map(name => name.trim())
        .filter(name => name !== "");
    const numTeams = parseInt(document.getElementById("teams").value);
    const playersPerTeam = parseInt(document.getElementById("players").value);
    const hasGoalkeeper = document.getElementById("goalkeeper").checked;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ''; // Limpar o resultado anterior

    // Verificar quantidade de jogadores necessária
    const totalPlayersNeeded = numTeams * (playersPerTeam + (hasGoalkeeper ? 1 : 0));
    if (names.length < totalPlayersNeeded) {
        resultDiv.innerHTML = '<p class="text-danger">Número de jogadores insuficiente para o sorteio. São necessários pelo menos ' + totalPlayersNeeded + ' jogadores.</p>';
        return;
    }

    // Embaralhar os jogadores aleatoriamente
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Inicializar os times como listas vazias
    let teams = Array.from({ length: numTeams }, () => []);

    // Distribuir os jogadores nos times, excluindo goleiros se houver
    let playerIndex = 0;
    for (let i = 0; i < playersPerTeam; i++) {
        for (let j = 0; j < numTeams; j++) {
            if (names.length > 0) {
                teams[j].push(names[playerIndex++]);
            }
        }
    }

    // Adicionar goleiros, se selecionado
    if (hasGoalkeeper) {
        for (let i = 0; i < numTeams; i++) {
            if (names.length > playerIndex) {
                teams[i].unshift(names[playerIndex++]);
            }
        }
    }

    // Exibir os times com uma apresentação estilizada
    teams.forEach((team, index) => {
        let teamDiv = document.createElement('div');
        teamDiv.classList.add('team', 'mb-3', 'p-3', 'rounded', 'bg-light');
        teamDiv.innerHTML = `<h3>Time ${index + 1}</h3><p>${team.join(', ')}</p>`;
        resultDiv.appendChild(teamDiv);
    });
}
