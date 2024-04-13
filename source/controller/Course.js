import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebasecfg";
import { getAll } from "firebase/remote-config";
const Course = {
  add: async (id, image, title, rate, time, description, lessons) => {
    //Example:
    // Building.add("H6", "CS1");
    try {
      const re = await setDoc(doc(db, "Course", id), {
        image: image,
        title: title,
        description: description,
        rate: rate,
        time: time,
      });
      for await (const lesson of lessons) {
        const lessonRef = await setDoc(
          doc(db, "Course/" + id + "/Lessons", lesson.id),
          {
            name: lesson.name,
            time: lesson.time,
            link: lesson.link,
            availble: true,
          }
        );
        //  const lessonRef= await setDoc(doc(db, "Course/"+ id + "/Lessons","Headquarter-room"), {
        //     size: 100,
        //  });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  get: async (id) => {
    try {
      const docRef = doc(db, "Course", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return docSnap.data();
    } catch (e) {
      console.error("Error getting document:", e);
    }
  },
  getRef: async (id) => {
    try {
      const courseRef = await Course.getRef("1");
      const q = query(collection(courseRef, "Lessons"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (e) {
      console.error("Error getting document:", e);
    }
  },
  getAllLessons: async (id) => {
    try {
      const q = query(collection(db, "Course/" + id + "/Lessons"));
      const querySnapshot = await getDocs(q);
      const res = querySnapshot.docs.map((doc) => {
        let note = {
          id: doc.id,
          attribute: doc.data(),
        };
        
        return note;
      });
      
      return res;
    } catch (e) {
      console.error("Error getting document:", e);
    }
  },
  getAll: async () => {
    try {
      const docRef = collection(db, "Course");
      const docSnap = await getDocs(docRef);
      const res = docSnap.docs.map((doc) => {
        let note = {
          id: doc.id,
          attribute: doc.data(),
        };
        return note;
      });
      return res;
    } catch (e) {
      console.error("Error getting document:", e);
    }
  },
};

export default Course;
