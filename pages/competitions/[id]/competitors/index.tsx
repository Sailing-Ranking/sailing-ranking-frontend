import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, useState } from "react";
import Table from "../../../../components/Table";
import { H1 } from "../../../../components/utils/typography/Header";
import { useFetchCompetitionCompetitors } from "../../../../hooks/competition/useFetchCompetitionCompetitors";
import { Competitor } from "../../../../types/competitor";

type Props = {
    competitors: Competitor[]
}

const Competitors: NextPage<Props> = ({competitors}) => {
    return (
        <H1>Competitors {competitors[0].first_name}</H1>
        
    )
}

const CompetitorTable: FunctionComponent<Props> = ({competitors}) => {

    return (
        <Table>
            <Table.THead>
                
            </Table.THead>
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