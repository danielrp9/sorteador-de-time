function sortTeams() {
    // Obter os nomes dos jogadores em linhas separadas, removendo espaços extras e linhas vazias
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

    // Inicializar os times e distribuir os jogadores
    let teams = Array.from({ length: numTeams }, () => []);
    let playerIndex = 0;
    for (let i = 0; i < playersPerTeam; i++) {
        for (let j = 0; j < numTeams; j++) {
            if (playerIndex < names.length) {
                teams[j].push(names[playerIndex++]);
            }
        }
    }

    // Adicionar goleiros, se necessário
    if (hasGoalkeeper) {
        for (let i = 0; i < numTeams; i++) {
            if (playerIndex < names.length) {
                teams[i].unshift(names[playerIndex++]);
            }
        }
    }

    // Separar jogadores restantes que não completam um time
    const remainingPlayers = names.slice(playerIndex);

    // Exibir os times
    teams.forEach((team, index) => {
        let teamDiv = document.createElement('div');
        teamDiv.classList.add('team', 'mb-3', 'p-3', 'rounded', 'bg-light');
        teamDiv.innerHTML = `<h3>Time ${index + 1}</h3><p>${team.join(', ')}</p>`;
        resultDiv.appendChild(teamDiv);
    });

    // Exibir os jogadores sem time completo, se houver
    if (remainingPlayers.length > 0) {
        let remainingDiv = document.createElement('div');
        remainingDiv.classList.add('remaining-players', 'mb-3', 'p-3', 'rounded', 'bg-warning');
        remainingDiv.innerHTML = `<h3>Sem time completo</h3><p>${remainingPlayers.join(', ')}</p>`;
        resultDiv.appendChild(remainingDiv);
    }
}
