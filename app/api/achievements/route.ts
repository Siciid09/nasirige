import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// ==========================================
// 1. READ (Fetch all achievements for public showcase)
// ==========================================
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'achievements'));
    
    const achievements = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(achievements, { status: 200 });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Failed to retrieve achievements.' }, { status: 500 });
  }
}

// ==========================================
// 2. CREATE (Add a new achievement)
// ==========================================
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add document to Firebase with a server timestamp
    const docRef = await addDoc(collection(db, 'achievements'), {
      ...data,
      createdAt: serverTimestamp(), 
    });

    return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
  } catch (error) {
    console.error('Error adding achievement:', error);
    return NextResponse.json({ error: 'Failed to save the achievement.' }, { status: 500 });
  }
}

// ==========================================
// 3. UPDATE (Edit an existing achievement)
// ==========================================
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Extract the ID from the payload, and keep the rest as the update data
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Achievement ID is required for updating.' }, { status: 400 });
    }

    const docRef = doc(db, 'achievements', id);
    await updateDoc(docRef, updateData);

    return NextResponse.json({ success: true, message: 'Achievement updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating achievement:', error);
    return NextResponse.json({ error: 'Failed to update achievement.' }, { status: 500 });
  }
}

// ==========================================
// 4. DELETE (Remove an achievement)
// ==========================================
export async function DELETE(request: Request) {
  try {
    // Grab the ID from the URL parameters (e.g., /api/achievements?id=123)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Achievement ID is required for deletion.' }, { status: 400 });
    }

    const docRef = doc(db, 'achievements', id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: 'Achievement deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return NextResponse.json({ error: 'Failed to delete achievement.' }, { status: 500 });
  }
}