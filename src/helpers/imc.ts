export type Level = {
    title: string;
    color: string;
    icon: 'down' | 'up';
    imc: number[];
    yourImc?: number;
}

export const levels: Level[] = [ //o levels será um array de Level
    { title: 'Magreza', color: '#96A3AB', icon: 'down', imc: [0, 18.5] },
    { title: 'Normal', color: '#0EAD69', icon: 'up', imc: [18.6, 24.9] },
    { title: 'Sobrepeso', color: '#E2B039', icon: 'down', imc: [25, 30] },
    { title: 'Obesidade', color: '#C3423F', icon: 'down', imc: [30.1, 99] }
]; 

export const calculateImc = (height: number, weight: number) => {
    const imc = weight / (height * height); //calcula o imc multiplicando altura * altura e dividindo pelo peso

    for(let i in levels) { //anda por todos os levels
        if(imc >= levels[i].imc[0] && imc < levels[i].imc[1]){ //comparacao para verificar se estou dentro desse level. Se o valor do imc calculado acima for maior  ou igual ao primeiro item [0] e menor do que o segundo item [1]
            let levelCopy: Level = {...levels[i]}; //cria uma copia do level e altera essa copia
            levelCopy.yourImc =parseFloat(imc.toFixed(2));
            //quando tiver o yourimc dentro do level mostra o quadro grande com o seu IMC, quando nao tiver não mostra
            return levelCopy //se estiver retorno aquele level
        }
    }
    return null; //caso n tenha sido calculado, ou não tenha.
}