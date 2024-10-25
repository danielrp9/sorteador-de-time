function sortTeams() {
    const names = document.getElementById("names").value.split(',').map(name => name.trim()).filter(name => name !== "");
    const numTeams = parseInt(document.getElementById("teams").value);
    const playersPerTeam = parseInt(document.getElementById("players").value);
    const hasGoalkeeper = document.getElementById("goalkeeper").checked;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ''; // Limpar o resultado anterior

    // Verificar jogadores necessários
    const totalPlayersNeeded = numTeams * (playersPerTeam + (hasGoalkeeper ? 1 : 0));
    if (names.length < totalPlayersNeeded) {
        resultDiv.innerHTML = '<p class="text-danger">Número de jogadores insuficiente para o sorteio. São necessários pelo menos ' + totalPlayersNeeded + ' jogadores.</p>';
        return;
    }

    // Embaralhar os jogadores
    for (let i = names.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [names[i], names[j]] = [names[j], names[i]];
    }

    // Distribuir os jogadores nos times
    let teams = [];
    for (let i = 0; i < numTeams; i++) {
        teams[i] = [];
    }

    let index = 0;
    while (names.length > 0 && index < playersPerTeam) {
        for (let i = 0; i < numTeams && names.length > 0; i++) {
            teams[i].push(names.shift());
        }
        index++;
    }

    // Adicionar goleiros se necessário
    if (hasGoalkeeper) {
        for (let i = 0; i < numTeams && names.length > 0; i++) {
            teams[i].unshift(names.shift());
        }
    }

    // Exibir os times
    for (let i = 0; i < teams.length; i++) {
        let teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `<h3>Time ${i + 1}</h3><p>${teams[i].join(', ')}</p>`;
        resultDiv.appendChild(teamDiv);
    }
}