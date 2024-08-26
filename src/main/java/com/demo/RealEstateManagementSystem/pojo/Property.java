package com.demo.RealEstateManagementSystem.pojo;



import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;


@Entity
public class Property {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false)
    private Long id;
    @Column(nullable=false,length=25)
    private String location;
    private String description;
    @Column(nullable=false)
    private float price;
    @Column(nullable=false)
    private int bedrooms;
    @Column(nullable=false)
    private int bathrooms;
    @Column(nullable=false)
    private Double SquareFeet;
    @Column(nullable=false)
    private Double LotSize;
    
    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;
    
    public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Double getSquareFeet() {
		return SquareFeet;
	}

	public void setSquareFeet(Double squareFeet) {
		SquareFeet = squareFeet;
	}

	public Double getLotSize() {
		return LotSize;
	}

	public void setLotSize(Double lotSize) {
		LotSize = lotSize;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getBathrooms() {
		return bathrooms;
	}

	public void setBathrooms(int bathrooms) {
		this.bathrooms = bathrooms;
	}
	
	public int getBedrooms() {
		return bedrooms;
	}

	public void setBedrooms(int bedrooms) {
		this.bedrooms = bedrooms;
	}

	public String getProptype() {
		return proptype;
	}

	public void setProptype(String proptype) {
		this.proptype = proptype;
	}

	public String getAvail() {
		return avail;
	}

	public void setAvail(String avail) {
		this.avail = avail;
	}
	@Column(nullable=false,length=50)
    private String proptype;
	@Column(nullable=false,length=10)
	private String avail;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JsonBackReference
	 @JoinColumn(name = "agent_id", nullable = false)
	 private User agent;

	public User getAgent() {
		return agent;
	}

	public void setAgent(User agent) {
		this.agent = agent;
	}
	 @Transient
	 private String imageString;
	 
	 public String getImageString() {
	        if (image != null) {
	            return Base64.getEncoder().encodeToString(image);
	        }
	        return null;
	    }

	 public void setImageString(String imageString) {
	        this.imageString = imageString;
	    }

}


