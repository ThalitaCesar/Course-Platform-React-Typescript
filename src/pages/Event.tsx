import { gql, useQuery } from "@apollo/client";
import { isPast } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { useGetFirstLessonQuery } from "../graphql/generated";


export function Event(){

    const {slug} = useParams<{slug:string}>();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { data } = useGetFirstLessonQuery();
    

    useEffect(() => {
        setShowModal(false);

        if (!slug && data?.lessons) {
            const { availableAt, slug } = data.lessons[0];

            if (isPast(new Date(availableAt))) {
                navigate(`/event/lesson/${slug}`);
            }
        }
    }, [data])

    function handleToggleMenu() {
        setShowModal(!showModal);
    }
    return(
        <div className="flex flex-col">
            <Header width={167} height={23.78}
            open={showModal}
            toggleMenu={handleToggleMenu}/>
        <div className= "flex flex-col min-h-screen">
        <main className="flex flex-1">
                {slug? <Video lessonSlug={slug}/> : <div className="flex-1"></div>}
        <div className="hidden lg:flex">
            <Sidebar/>
        </div>
        </main>
        </div>

           {showModal && (
            <Modal>
                <Sidebar />
            </Modal>
        )}
     <div className="w-full ">
                <Footer />
            </div>
    </div>
    )
} 