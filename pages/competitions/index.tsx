import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Main from "../../components/layout/Main";
import List from "../../components/utils/List";
import { useFetchCompetitions } from "../../hooks/competition/useFetchCompetitions";
import { Competition } from "../../types/competition";

type Props = {
    competitions: Competition[]
}

const Competitions: NextPage<Props> = ({competitions}) => {
    return (
        <Main>
            <div className="flex justify-center">
                <List>
                {competitions.map(competition => (
                    <List.Item key={competition.id}>
                        <Link href={`/competitions/${competition.id}`}>
                            <a>{competition.title}</a>
                        </Link>
                    </List.Item>
                ))}
                </List>
            </div>
        </Main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const competitions: Competition[] = await useFetchCompetitions()

    return {
        props: {
            competitions: competitions
        }
    }
}

export default Competitions