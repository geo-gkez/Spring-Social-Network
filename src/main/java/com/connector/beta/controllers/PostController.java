package com.connector.beta.controllers;

import com.connector.beta.projections.PostProjection;
import com.connector.beta.entities.*;
import com.connector.beta.services.CommentServiceInterface;
import com.connector.beta.services.PostServiceInterface;
import com.connector.beta.services.UserServiceInterface;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostServiceInterface postServiceInterface;

    @Autowired
    CommentServiceInterface commentServiceInterface;

    @Autowired
    UserServiceInterface userServiceInterface;

    @GetMapping("/testUrl")
    public List<PostProjection> testRetrievePots(Principal principal) {
//        System.out.println(principal.toString());
//        return postServiceInterface.findByUser(1);
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        return postServiceInterface.findByUserIdsTEST();
    }

    @PostMapping("/insertComment")
    public Comment insertComment(@RequestHeader String input, @RequestHeader int postId, Principal principal) {
        Comment comment = new Comment();
        comment.setText(input);
        comment.setPost(postServiceInterface.findPostByPostId(postId));
        comment.setUser(userServiceInterface.getUserDetails(principal.getName()));
        comment.setCreated(new Timestamp(System.currentTimeMillis()));
        commentServiceInterface.insertComment(comment);
        return comment;
    }

    @PostMapping("/insertPost")
    public Post insertPost(@RequestHeader String text, @RequestHeader String imageUrl, Principal principal) {
        Post post = new Post();
        post.setUser(userServiceInterface.getUserDetails(principal.getName()));
        post.setText(text);
        post.setImageUrl(imageUrl);
        System.out.println(imageUrl);
        post.setCreated(new Timestamp(System.currentTimeMillis()));
        postServiceInterface.insertPost(post);
        return new Post();
    }

    @PostMapping(
            path = "/insertPostWithFile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(value = HttpStatus.OK)
    public void insertPostWithFile(
            @RequestParam("file") MultipartFile file,
            @RequestHeader String text,
            Principal principal) {
        postServiceInterface.insertPostWithImage(text, file, userServiceInterface.getUserDetails(principal.getName()));
    }

    @GetMapping("/downloadPostImage/{postId}")
    public ResponseEntity<Resource> downloadPostImage(@PathVariable Integer postId) {
        PostImage postImage = postServiceInterface.findPostImageByPostId(postId);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachement; filename=" + postImage.getTitle());
        return ResponseEntity.ok()
                .headers(header)
                .contentLength(postImage.getFile().length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new ByteArrayResource(postImage.getFile()));
    }

    @PostMapping("/cheers")
    public List<Cheer> cheers(@RequestHeader int postId, Principal principal) {
        Post post = postServiceInterface.findPostByPostId(postId);
        MyUser user = userServiceInterface.getUserDetails(principal.getName());
        return postServiceInterface.cheers(post, user);
    }

    @PostMapping("/removePost")
    @ResponseStatus(HttpStatus.OK)
    public String removePost(@RequestHeader int postId, Principal principal) {
        Post post = postServiceInterface.findPostByPostId(postId);
        MyUser user = userServiceInterface.getUserDetails(principal.getName());
        if (post.getUser().getUserId() == user.getUserId()) {
            postServiceInterface.removePost(post);
        }
        return "Post Deleted";
    }

    @PostMapping("/removeComment")
    @ResponseStatus(HttpStatus.OK)
    public String removeComment(@RequestHeader int commentId, Principal principal) {
        Comment comment = commentServiceInterface.findCommentByCommentId(commentId);
        MyUser user = userServiceInterface.getUserDetails(principal.getName());
        if (comment.getUser().getUserId() == user.getUserId()) {
            commentServiceInterface.removeComment(comment);
        }
        return "Comment Deleted";
    }
}
