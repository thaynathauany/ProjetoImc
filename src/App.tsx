import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/imc.png'
import leftArrowImage from './assets/leftarrow.png'
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toshow, setToShow] = useState<Level | null >(null) //armazena o item para exibi-lo. Começa como nulo quando nao tem nada pra exibir, se tiver algo fica como level

  const handleCalculateButton = () => { //nessa função, se todos os campos não estiverem preenchidos, emitimos um alerta
    if (heightField && weightField) { //verifica se altura e largura estão preenchidos
      setToShow(calculateImc(heightField, weightField))
    } else {
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton = ()  => { //limpa todos os campoos
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="logo" width={100} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>

          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''} //se o numero que começar for maior do que 0 mostra o numero, caso contrário mosta o placeholder
            onChange={e => setHeightField(parseFloat(e.target.value))} //value sempre vem com uma string então precisamos do parseFloat para transforma-lo em número
            disabled={toshow ? true : false} //se estiver algo dentro de toShow o componente é desabilitado
          />
          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 71.5 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toshow ? true : false} 
          />

          <button onClick={handleCalculateButton}  disabled={toshow ? true : false}>Calcular</button>
          <div className={styles.owner}><i>Desenvolvido por Thayná Thauany</i></div>
        </div>
        <div className={styles.rightSide}>
          {!toshow &&  //só exibe o grid quando não houver nenhum toShow e entao mostra os 4 grids
            <div className={styles.grid}>
              {levels.map((item, key)=>( //entra no array de levels e gera um item e uma key a cada item
              <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toshow && //mostra apenas o grid do IMC correto
            <div className={styles.rightBig}> 
              <div className={styles.rightArrow} onClick={handleBackButton}> 
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toshow}/> 
              {/* O grid Item serve pra exibir um item, entao se eu tenho um level para exibir, devo usar o gridItem. toShow é um level e item espera receber um level */}
            </div>
          }
        </div>
      </div>
    </div>
   
  )
}

export default App;