import {ChangeEvent, Component, isValidElement, useState} from "react";
import {InputText} from "./InputText";
import styled from "styled-components";
import {ColorPalette} from "../../colorPalette";
import '../styles/fonts.css'

interface DirectoryCreationPanelProps {
    callback: (name: string) => void
    onClose: () => void
}

interface DirectoryCreationPanelState {
    name: string
}


export class DirectoryCreationPanel extends Component<DirectoryCreationPanelProps, DirectoryCreationPanelState> {

    constructor(props: DirectoryCreationPanelProps) {
        super(props);
        this.state = {
            name: ''
        }
    }

    CreateButton = styled.button`
        font-size: 20px;
        border-radius: 10px 10px 20px 20px;
        padding: 5px 20px;
        background: ${ColorPalette.white};
        border: 0;
        filter: drop-shadow(0px 0px 7px ${ColorPalette.white});
        color: ${ColorPalette.darkBlue};
        font-family: Jost;

        &:hover {
            background: ${ColorPalette.fadedBlue};
        }
    ;
        animation: smoothAppearance 1s forwards, smoothAppearanceFromBottom 1s forwards;
    `

    render = () => {
        const setName = (value: string) => {
            this.setState({
                name: value
            })
        }

        const changeName = (e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
        }

        return <div>
            <button style={{background: ColorPalette.darkBlue, border: 0, display: 'inline-block'}}
                    onClick={this.props.onClose}>
                <img style={{width: 50, height: 50, float: "right"}} src={'/closeIcon.png'}/>
            </button>
            <div style={{
                display: 'grid',
                gap: 20,
                justifyContent: 'center',
                justifyItems: 'center',
                verticalAlign: 'middle',
                alignItems: 'center',
                marginTop: 100
            }}>
                <InputText placeholder={'Введите название папки'} onChange={changeName}/>
                <this.CreateButton onClick={() => {
                    this.props.callback(this.state.name)
                }}>Создать
                </this.CreateButton>
            </div>
        </div>
    }
}