import { GetServerSideProps, NextPage } from "next";
import React, { FunctionComponent, useState } from "react";
import Main from "../../../../components/layout/Main";
import Page from "../../../../components/layout/Page";
import Table from "../../../../components/Table";
import { H1 } from "../../../../components/utils/typography/Header";
import { useFetchCompetitionCompetitors } from "../../../../hooks/competition/useFetchCompetitionCompetitors";
import { Competitor } from "../../../../types/competitor";

type Props = {
    competitors: Competitor[]
}

const Competitors: NextPage<Props> = ({competitors}) => {
    return (
        <Page>
            <Main>
                <H1>Competitors:</H1>
                <hr/>
                <CompetitorTable competitors={competitors} />
            </Main>
        </Page>
        
    )
}

const CompetitorTable: FunctionComponent<Props> = ({competitors}) => {
    return (
        <Table>
            <Table.THead>
                <tr>
                    <Table.TH>#</Table.TH>
                    <Table.TH>First Name</Table.TH>
                    <Table.TH>Last Name</Table.TH>
                    <Table.TH>Country</Table.TH>
                    <Table.TH>Sail nr.</Table.TH>
                    <Table.TH>club</Table.TH>
                </tr>
            </Table.THead>
            <Table.TBody>
                {competitors.map((competitor, index) => (
                    <Table.TR key={competitor.id}>
                        <Table.TD>{index+1}</Table.TD>
                        <Table.TD>{competitor.first_name}</Table.TD>
                        <Table.TD>{competitor.last_name}</Table.TD>
                        <Table.TD>{competitor.country}</Table.TD>
                        <Table.TD>{competitor.sail_nr}</Table.TD>
                        <Table.TD>{competitor.club}</Table.TD>
                    </Table.TR>
                ))}
            </Table.TBody>
        </Table>
    )

}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    // @ts-ignore
    const competitors: Competitor[] = await useFetchCompetitionCompetitors(params?.id)

    return {
        props: {
            competitors
        }
    }
}

export default Competitors