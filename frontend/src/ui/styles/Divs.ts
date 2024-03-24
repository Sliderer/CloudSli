import styled from "styled-components";

export const HorizontalCenterDiv = styled.div`
    display: flex;
    justify-content: center;
`

export const ColumnDiv = styled.div`
    display: inherit;
    flex-direction: column;
`

export const VerticalCenterDiv = styled.div`
    position: absolute;
    display: inherit;
    transform: translateY(+100%);
`