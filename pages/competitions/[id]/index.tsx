import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Heading from "../../../components/layout/Heading";
import Page from "../../../components/layout/Page";
import Button from "../../../components/utils/Button";
import List from "../../../components/utils/List";
import { H1, H2 } from "../../../components/utils/typography/Header";
import { useFetchCompetitionRaces } from "../../../hooks/competition/useFetchCompetitionRaces";
import { useFetchCompetitions } from "../../../hooks/competition/useFetchCompetitions";

import { Competition } from "../../../types/competition"
import { Race } from "../../../types/race";

type Props = {
    competition: Competition
    races: Race[]
}

const Competition: NextPage<Props> = ({ competition, races }) => {

    return (
        <Page>
            <Heading>
                <H1>{competition.title}</H1>
            </Heading>

            <section>
                <H2>Races</H2>
                <div className="flex justify-center">
                    <List>
                        {races.map(race => (
                            <List.Item key={race.id} className="flex justify-between">
                                <Link href={`/races/${race.id}`}>
                                    <a><Button.Link>Race #{race.race_nr}</Button.Link></a>
                                </Link>
                                <Link href={`/competitions/${competition.id}/races/${race.id}/positions`}>
                                    <a><Button.Link>take finishes</Button.Link></a>
                                </Link>
                            </List.Item>
                        ))}
                    </List>
                </div>
            </section>
        </Page>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // @ts-ignore
    const competition: Competition = await useFetchCompetitions(params?.id)
    // @ts-ignore
    const races: Race[] = await useFetchCompetitionRaces(params?.id)

    return {
        props: {
            competition: competition,
            races: races
        }
    }
}


export default Competition