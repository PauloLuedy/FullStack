import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StartWorsService from "../../services/startwors.service";
import styled from 'styled-components'

class Personagem extends Component {

    state = {
        herois: {},
        pessoa: {}
    }

    // PEga dado da api antes de continuar o codigo
    componentDidMount() {
        console.log('teste', this.state.pessoa);
        StartWorsService.get(this.state.pessoa)
            .then(res => {
                console.log(`res`, res.data);
                const herois = res.data;
                this.setState({ herois });
            })
    }

    handleClick() {
        //const round =  Math.floor(Math.random() * (40 - 1)) + 1;
        //console.log(round);
        let pessoa = {
            nome: "Matheus"
        }
        this.setState({pessoa});  
      }

    render() {
        return (
            <ul>
                <div>
                    <tr>
                        <td> {this.state.herois.eye_color} </td>
                        <td> {this.state.herois.name} </td>
                        <input onChange={this.handleClick} />
                    </tr>
                </div>
            </ul>
        )
    }
}

export default Personagem;