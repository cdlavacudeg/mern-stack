import React from 'react';
import { useParams } from 'react-router-dom';

export default function AddReview({user}) {
    let {id}=useParams();
    return (
        <div>add-reviews,{user},{id}</div>
    )
}
